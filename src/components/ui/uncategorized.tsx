interface UncategorizedProps {
  className?: string;
}

export function Uncategorized({ className }: UncategorizedProps) {
  return (
    <span className={`italic text-yellow-500 dark:text-yellow-400 ${className || ''}`}>
      Uncategorized
    </span>
  );
}
