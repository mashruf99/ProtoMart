
import { SellerRegisterForm } from "@/components/auth/SellerRegisterForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SellerRegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-accent">Become a Seller</CardTitle>
          <CardDescription>Create your seller account to start listing products.</CardDescription>
        </CardHeader>
        <CardContent>
          <SellerRegisterForm />
           <p className="text-center text-sm text-muted-foreground mt-4">
            Already have a seller account?{" "}
            <Link href="/seller/login" className="font-medium text-primary hover:underline">
              Login here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
