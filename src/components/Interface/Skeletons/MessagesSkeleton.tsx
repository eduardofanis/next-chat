import Header from "@/components/Header/Header";

export default function MessagesSkeleton() {
  return (
    <div className="relative h-full sm:w-96">
      <div className="flex w-full justify-center border-solid border-b border-zinc-900 pb-5 mb-5">
        <h1 className="text-zinc-400">Suas conversas</h1>
      </div>
      <div role="status" className="rounded shadow animate-pulse">
        <div className="grid grid-cols-messages sm:w-96 mb-4 pb-4 border-b border-zinc-900 space-x-4 justify-start items-center">
          <div className="h-12 bg-zinc-600 rounded-full w-12 inline-block row-span-2"></div>
          <div className="h-4 bg-zinc-600 rounded-full w-24"></div>
          <div className="h-3 bg-zinc-600 rounded-full w-12"></div>
          <div className="w-32 h-3 bg-zinc-700 rounded-full col-start-2"></div>
        </div>
        <div className="grid grid-cols-messages sm:w-96 mb-4 pb-4 border-b border-zinc-900 space-x-4 justify-start items-center">
          <div className="h-12 bg-zinc-600 rounded-full w-12 inline-block row-span-2"></div>
          <div className="h-4 bg-zinc-600 rounded-full w-24"></div>
          <div className="h-3 bg-zinc-600 rounded-full w-12"></div>
          <div className="w-32 h-3 bg-zinc-700 rounded-full col-start-2"></div>
        </div>
        <div className="grid grid-cols-messages sm:w-96 mb-4 pb-4 border-b border-zinc-900 space-x-4 justify-start items-center">
          <div className="h-12 bg-zinc-600 rounded-full w-12 inline-block row-span-2"></div>
          <div className="h-4 bg-zinc-600 rounded-full w-24"></div>
          <div className="h-3 bg-zinc-600 rounded-full w-12"></div>
          <div className="w-32 h-3 bg-zinc-700 rounded-full col-start-2"></div>
        </div>
        <div className="grid grid-cols-messages sm:w-96 mb-4 pb-4 border-b border-zinc-900 space-x-4 justify-start items-center">
          <div className="h-12 bg-zinc-600 rounded-full w-12 inline-block row-span-2"></div>
          <div className="h-4 bg-zinc-600 rounded-full w-24"></div>
          <div className="h-3 bg-zinc-600 rounded-full w-12"></div>
          <div className="w-32 h-3 bg-zinc-700 rounded-full col-start-2"></div>
        </div>
        <div className="grid grid-cols-messages sm:w-96 mb-4 pb-4 border-b border-zinc-900 space-x-4 justify-start items-center">
          <div className="h-12 bg-zinc-600 rounded-full w-12 inline-block row-span-2"></div>
          <div className="h-4 bg-zinc-600 rounded-full w-24"></div>
          <div className="h-3 bg-zinc-600 rounded-full w-12"></div>
          <div className="w-32 h-3 bg-zinc-700 rounded-full col-start-2"></div>
        </div>
      </div>
    </div>
  );
}
