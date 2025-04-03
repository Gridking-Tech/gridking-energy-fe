import React from 'react'
import Button from '../util/Button'
import Input from '../util/Inputs'

interface ProductDetailModalProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductDetailModal({
  formData,
  setFormData,
  handleInputChange,
  handleSubmit,
  setIsModalOpen,
}: ProductDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex z-50 items-center justify-center">
      <div className="bg-white flex\ flex-col p-6 rounded-lg w-[40%] h-[80%] shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={() => setIsModalOpen(false)}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">GET A QUOTE</h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          If you have a query regarding our product, please complete the form below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5 w-full flex flex-col">
          <div className="flex flex-col w-full gap-3">
            <Input
              value={formData.firstName}
              showLabel
              label='Name'
              name="firstName"
              placeholder="First Name"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <Input
              value={formData.lastName}
              showLabel
              label='Last Name'
              name="lastName"
              placeholder="Last Name"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <Input
            value={formData.country}
            showLabel
            label='Country'
            name="country"
            placeholder="Country"
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex w-full flex-col  gap-3">
            <Input
              value={formData.email}
              name="email"
              showLabel
              label='Email'
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <Input
              value={formData.phone}
              showLabel
              label='Whatsapp Num'
              name="phone"
              placeholder="Whatsapp/Phone"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <textarea
            name="requirements"
            placeholder="Your requirements: product model, size, quantity"
            
            value={formData.requirements}
            onChange={handleInputChange}
            className="w-full p-2 border rounded h-24"
          ></textarea>
          <Button title="SEND" type="submit" className="w-full bg-orange-500 text-white py-2 rounded" />
        </form>
      </div>
    </div>
  )
}
