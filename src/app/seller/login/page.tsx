
import { SellerLoginForm } from "@/components/auth/SellerLoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SellerLoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-accent">Seller Login</CardTitle>
          <CardDescription>Sign in to your seller account.</CardDescription>
        </CardHeader>
        <CardContent>
          <SellerLoginForm />
           <p className="text-center text-sm text-muted-foreground mt-4">
            New here?{" "}
            <Link href="/seller/register" className="font-medium text-primary hover:underline">
              Create a seller account
            </Link>
          </p>
           <p className="text-center text-sm text-muted-foreground mt-2">
            Not a seller?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Login as a buyer
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
