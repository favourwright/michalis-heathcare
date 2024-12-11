import { useState } from "react"

const FindADoctorCard = () => {
  const [form, setForm] = useState({
    speciality: '',
    location: '',
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:max-w-sm bg-white/90 backdrop-blur-sm
      rounded-xl shadow-lg p-6 flex flex-col gap-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-teal-800">Find a Doctor</h2>
        <p className="text-sm text-teal-600">Enter your details to search for available doctors.</p>
      </div>

      {/* <Input
        value={form.speciality}
        onValueChange={(e) => setForm({ ...form, speciality: e })}
        type="email"
        variant='faded'
        label="Email"
        size="sm"
        placeholder="Enter your email"
        classNames={{
          input: 'text-gray-700',
        }}
      /> */}
    </form>
  )
}

export default FindADoctorCard