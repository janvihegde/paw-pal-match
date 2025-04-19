
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";

type UserRole = "admin" | "user" | null;

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userRole: UserRole;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state change event:", event);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Don't fetch user role here to avoid deadlock
        if (event === "SIGNED_OUT") {
          setUserRole(null);
          setIsAdmin(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session ? "Session exists" : "No session");
      setSession(session);
      setUser(session?.user ?? null);
      
      // Fetch user role after setting session
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user role separately to avoid deadlock
  const fetchUserRole = async (userId: string) => {
    try {
      console.log("Fetching user role for user ID:", userId);
      const { data, error } = await supabase.rpc('has_role', { 
        user_id: userId, 
        role_name: 'admin' 
      });

      if (error) {
        console.error('Error checking user role:', error);
        setIsAdmin(false);
      } else {
        console.log("Role check result:", data);
        setIsAdmin(!!data);
        setUserRole(data ? 'admin' : 'user');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // When user changes, fetch their role
    if (user) {
      fetchUserRole(user.id);
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        toast.error("Login failed", {
          description: error.message,
        });
        return;
      }
      
      // Special case for the specified admin email
      if (email === "nnm23cs085@nmamit.in") {
        console.log("Detected admin email login, assigning admin role");
        try {
          // Call the edge function to make this user an admin
          const { data: functionData, error: functionError } = await supabase.functions.invoke('add_admin_role', {
            body: { email }
          });
          
          if (functionError) {
            console.error("Error making user admin:", functionError);
          } else {
            console.log("Admin role function response:", functionData);
            
            // Refetch user role immediately 
            if (data.session?.user) {
              await fetchUserRole(data.session.user.id);
            }
          }
        } catch (functionCallError) {
          console.error("Error calling admin function:", functionCallError);
        }
      }
      
      toast.success("Login successful!");
    } catch (error) {
      console.error("Unexpected login error:", error);
      toast.error("Login failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to log out");
    }
  };

  const value = {
    session,
    user,
    userRole,
    signIn,
    signOut,
    loading,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
