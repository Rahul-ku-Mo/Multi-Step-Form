import { UserList } from "./components/UserList";
import { CreateUserModal } from "./components/CreateUserModal";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          Multi-Step Registration Form
        </h1>
        <CreateUserModal />
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
         
          <UserList />
        </div>
      </main>
    </div>
  );
}
