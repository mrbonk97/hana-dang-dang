import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface MixStepProps {
  step: number;
  className?: string;
}
export const MixStep = ({ step, className }: MixStepProps) => (
  <Breadcrumb className={className}>
    <BreadcrumbList className="text-lg font-medium space-x-5">
      <BreadcrumbItem
        className={`duration-300 ${step >= 0 && "text-custom-300"}`}
      >
        1
      </BreadcrumbItem>
      <BreadcrumbSeparator
        className={`duration-300 ${step >= 1 && "text-custom-300"}`}
      />
      <BreadcrumbItem
        className={`duration-300 ${step >= 1 && "text-custom-300"}`}
      >
        2
      </BreadcrumbItem>
      <BreadcrumbSeparator
        className={`duration-300 ${step >= 1 && "text-custom-300"}`}
      />
      <BreadcrumbItem
        className={`duration-300 ${step >= 2 && "text-custom-300"}`}
      >
        3
      </BreadcrumbItem>
      <BreadcrumbSeparator
        className={`duration-300 ${step >= 2 && "text-custom-300"}`}
      />
      <BreadcrumbItem
        className={`duration-300 ${step >= 3 && "text-custom-300"}`}
      >
        4
      </BreadcrumbItem>
      <BreadcrumbSeparator
        className={`duration-300 ${step >= 3 && "text-custom-300"}`}
      />
      <BreadcrumbItem
        className={`duration-300 ${step >= 4 && "text-custom-300"}`}
      >
        5
      </BreadcrumbItem>
      <BreadcrumbSeparator
        className={`duration-300 ${step >= 4 && "text-custom-300"}`}
      />
      <BreadcrumbItem
        className={`duration-300 ${step >= 5 && "text-custom-300"}`}
      >
        6
      </BreadcrumbItem>
      <BreadcrumbSeparator
        className={`duration-300 ${step >= 5 && "text-custom-300"}`}
      />
      <BreadcrumbItem
        className={`duration-300 ${step >= 6 && "text-custom-300"}`}
      >
        7
      </BreadcrumbItem>
      <BreadcrumbSeparator
        className={`duration-300 ${step >= 6 && "text-custom-300"}`}
      />
      <BreadcrumbItem
        className={`duration-300 ${step >= 7 && "text-custom-300"}`}
      >
        8
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);
