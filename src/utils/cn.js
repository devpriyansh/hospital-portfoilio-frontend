// Simple utility to merge class names (replaces clsx for this project)
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
