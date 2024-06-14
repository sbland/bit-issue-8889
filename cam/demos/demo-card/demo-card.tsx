import React from 'react';
import type { ReactNode } from 'react';
import { Foo } from '@my/scope.core.lib';

export type DemoCardProps = {
  /**
   * sets the component children.
   */
  children?: ReactNode;
};

export function DemoCard({ children = null }: DemoCardProps) {
  return (
    <div>
      {children}
      {/* Accessing Foo which fails strict type checking */}
      {Foo("hello")}
    </div>
  );
}
