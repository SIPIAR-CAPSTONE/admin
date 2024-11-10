import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

export default function NotFoundPage() {
  const navigation = useNavigate();
  //TODO: add authentication checking here

  return (
    <section className="bg-white dark:bg-neutral-900 ">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div>
          <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-neutral-800 dark:text-white md:text-3xl">
            We can’t find that page
          </h1>
          <p className="mt-4 text-neutral-500 dark:text-neutral-400">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Button
              className="space-x-2.5 dark:bg-neutral-900 dark:text-white dark:border-neutral-600"
              variant="outline"
              onClick={() => navigation(-1)}
            >
              <MoveLeft size={16} />
              <span className="font-normal">Go Back</span>
            </Button>

            {/* TODO: add this after adding the authentication checking
            {user && (
              <Button onClick={() => navigation("/")}>Take me home</Button>
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}
