import ProfileForm from '@/components/profile/ProfileForm';

export default function ProfilePage() {
  return (
    <section className="min-h-screen bg-gray-50 flex justify-center items-start py-20 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-[#ff5100] mb-6">Update Your Profile</h2>
        <ProfileForm />
      </div>
    </section>
  );
}
