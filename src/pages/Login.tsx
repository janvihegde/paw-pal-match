
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailConfirmRequired, setEmailConfirmRequired] = useState(false);
  const navigate = useNavigate();
  const { signIn, isAdmin, user } = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/user/profile");
      }
    }
  }, [user, isAdmin, navigate]);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const resendConfirmationEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      
      if (error) {
        toast.error("Failed to resend confirmation email", {
          description: error.message
        });
      } else {
        toast.success("Confirmation email sent", {
          description: "Please check your inbox and follow the link to verify your account."
        });
      }
    } catch (error) {
      console.error("Error resending confirmation:", error);
      toast.error("Failed to resend confirmation email");
    }
  };

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      setEmailConfirmRequired(false);
      
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (authError) {
        console.log("Auth error:", authError);
        if (authError.message === "Email not confirmed") {
          setEmailConfirmRequired(true);
          form.setError("email", { 
            message: "Please verify your email before logging in" 
          });
          return;
        }
        
        form.setError("email", { message: authError.message });
        return;
      }
      
      // If successful, call our signIn method to update context
      await signIn(values.email, values.password);
      
      // Navigation will be handled by the useEffect based on isAdmin
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">User Login</h1>
            <p className="mt-2 text-gray-600">
              Sign in to access your account
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {emailConfirmRequired && (
                <div className="text-center">
                  <p className="text-sm text-amber-600 mb-2">
                    Please verify your email before logging in
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => resendConfirmationEmail(form.getValues("email"))}
                    className="w-full"
                  >
                    Resend confirmation email
                  </Button>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              
              <div className="flex justify-between items-center mt-4">
                <a href="/register" className="text-sm text-blue-600 hover:underline">
                  Create an account
                </a>
                <a href="/admin/login" className="text-sm text-gray-600 hover:underline">
                  Admin Login
                </a>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
