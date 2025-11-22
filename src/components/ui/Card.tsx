"use client";

import { ReactNode } from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function Card({
  title,
  subtitle,
  footer,
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md border border-gray-200 p-5 transition-all hover:shadow-xl hover:border-blue-300 ${className}`}
    >
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      {children && <div className="mb-3">{children}</div>}

      {footer && <div className="pt-3 border-t border-gray-100">{footer}</div>}
    </div>
  );
}
