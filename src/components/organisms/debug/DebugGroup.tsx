interface DebugGroupProps {
  title: string;
  children: React.ReactNode;
}

export function DebugGroup({ title, children }: DebugGroupProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <h3 className="text-sm font-medium text-muted-foreground whitespace-nowrap">{title}</h3>
        <div className="ml-2 h-px flex-1 bg-border" />
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}
