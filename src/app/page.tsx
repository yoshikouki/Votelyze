import CreateVoteForm from "@/features/polls/components/CreateVoteForm";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <h1 className="font-bold text-4xl">Votelyze</h1>
        <p className="text-lg">Super simple voting app</p>
        <div className="w-full max-w-md">
          <CreateVoteForm />
        </div>
      </main>
    </div>
  );
}
