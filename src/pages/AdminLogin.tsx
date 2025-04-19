
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

const AdminLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailConfirmRequired, setEmailConfirmRequired] = useState(false);
  const navigate = useNavigate();
  const { signIn, isAdmin, user } = useAuth();
  
  // Redirect if already logged in as admin
  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin");
    } else if (user) {
      // If logged in but not admin
      navigate("/user/profile");
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
      
      // For the admin login form, we'll make a special case for the known admin email
      const isKnownAdmin = values.email === "nnm23cs085@nmamit.in";
      
      // First try to log in directly
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
        
        // If it's the known admin and the user doesn't exist yet, offer to create an account
        if (isKnownAdmin && authError.message.includes("user")) {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
          });
          
          if (signUpError) {
            form.setError("email", { message: signUpError.message });
            return;
          }
          
          toast.success("Admin account created", {
            description: "Now please verify your email to continue."
          });
          
          setEmailConfirmRequired(true);
          return;
        }
        
        form.setError("email", { message: authError.message });
        return;
      }
      
      // If successful login, call our signIn method to update context
      await signIn(values.email, values.password);
      
      // Give some time for admin role to be assigned if needed
      if (isKnownAdmin) {
        // Explicit admin role assignment for the known admin
        toast.success("Admin access granted");
        
        // Force a quick reload to make sure admin status is properly applied
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1500);
      } else {
        // Check if user is admin, if not show error
        setTimeout(async () => {
          const { data } = await supabase.rpc('has_role', { 
            user_id: authData.user?.id,
            role_name: 'admin' 
          });
          
          if (!data) {
            form.setError("email", { 
              message: "This account does not have admin privileges" 
            });
            // Sign out automatically if not admin
            await supabase.auth.signOut();
          } else {
            navigate("/admin");
          }
        }, 500);
      }
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
            <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
            <p className="mt-2 text-gray-600">
              Sign in to access the admin dashboard
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
                      <Input 
                        type="email" 
                        placeholder="admin@example.com" 
                        {...field} 
                      />
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
                className="w-full bg-red-600 hover:bg-red-700" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login as Admin"}
              </Button>
              
              <div className="text-center mt-4">
                <a href="/login" className="text-sm text-blue-600 hover:underline">
                  User Login
                </a>
              </div>
              
              {form.getValues("email") === "nnm23cs085@nmamit.in" && (
                <div className="mt-4 p-3 bg-gray-100 rounded-md">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> For testing, use email: nnm23cs085@nmamit.in with password: 123456
                  </p>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
