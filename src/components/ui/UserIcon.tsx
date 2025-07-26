import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface UserIconProps {
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const UserIcon: React.FC<UserIconProps> = ({
  size = 24,
  className = "",
  onClick,
}) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleIconClick = () => {
    setVisible(true);
    if (onClick) {
      onClick();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('User data submitted:', formData);
    setVisible(false);
  };

  return (
    <>
      <div
        className={`flex items-center justify-center ${className}`}
        onClick={handleIconClick}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current"
        >
          <path
            d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="12"
            cy="7"
            r="4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <Dialog
        header="User Profile"
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button 
              label="Cancel" 
              icon="pi pi-times" 
              onClick={() => setVisible(false)} 
              className="p-button-text"
            />
            <Button 
              label="Save" 
              icon="pi pi-check" 
              onClick={handleSubmit}
            />
          </div>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="field">
            <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
            <InputText
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="w-full"
            />
          </div>
          
          <div className="field">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <InputText
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email address"
              className="w-full"
            />
          </div>
          
          <div className="field">
            <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
            <InputText
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your phone number"
              className="w-full"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};
