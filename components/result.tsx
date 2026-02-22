import { Skeleton } from './ui/skeleton';

interface ResultProps {
    isLoading: boolean;
    error: string;
    completion: string;
}

export function Result({ isLoading, error, completion }: ResultProps) {
  if (isLoading) {
    return (
      <Skeleton className="w-full p-6 mt-6 rounded-lg">
        Loading...
      </Skeleton>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 mt-6 rounded-lg bg-red-50 text-red-700">
        {error}
      </div>
    );
  }

  if (completion) {
    return (
      <div className="mt-6 p-4 rounded-lg bg-zinc-50 whitespace-pre-wrap">
        {completion}
      </div>
    );
  }

  return null;
}