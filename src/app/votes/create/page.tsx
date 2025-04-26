import CreateVoteForm from "@/features/polls/components/CreateVoteForm";

export default function CreateVotePage() {
  return (
    <div className="container mx-auto max-w-2xl p-6">
      <h1 className="mb-8 font-bold text-3xl">Create a New Vote</h1>
      <CreateVoteForm />
    </div>
  );
}
