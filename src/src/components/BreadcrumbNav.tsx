
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbNavProps {
  title: string;
  backTo: string;
  backLabel?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  title,
  backTo,
  backLabel = "Back",
}) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <Button
        variant="outline"
        size="sm"
        className="mb-4 text-foreground"
        onClick={() => navigate(backTo)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {backLabel}
      </Button>
      
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={backTo}>{backLabel}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbNav;
