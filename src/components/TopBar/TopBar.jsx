import React from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine } from "lucide-react";

export default function TopBar({
  breadcrumbsData = [],
  addBackButton = false,
  className,
  renderTrailer,
  ...props
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-2.5 py-3.5 ",
        className
      )}
      {...props}
    >
      <div className="flex items-center h-8">
        <SidebarTrigger className="dark:text-white" />
        <Separator orientation="vertical" className="h-4 ms-2 me-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbsData.map((breadcrumb, index) => {
              const isLastItem = breadcrumbsData.length - 1 === index;

              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem key={index}>
                    {isLastItem ? (
                      <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={breadcrumb.href} relative="path">
                          {breadcrumb.name}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {!isLastItem && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {addBackButton && (
        <div className="flex items-center">
          <Separator orientation="vertical" className="h-4 me-2.5" />
          <Link to=".." relative="path">
            <Button className="w-4 h-8 transition-colors shadow-none bg-neutral-100 dark:bg-neutral-600 dark:text-white hover:dark:bg-neutral-500 hover:bg-neutral-200 text-neutral-500 hover:text-black">
              <ArrowLeftFromLine />
            </Button>
          </Link>
        </div>
      )}
      {renderTrailer && renderTrailer()}
    </div>
  );
}
