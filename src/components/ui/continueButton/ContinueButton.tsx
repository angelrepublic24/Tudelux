import React from 'react'

type Props = {
    onContinue: () => void;
    onHandle? : () => void;
}
export const ContinueButton = ({onContinue, onHandle}: Props) => {
  return (
    <>
    <div className="flex justify-end mt-10">
        <button 
        className="bg-[#ff5100] text-lg px-10 py-5 border rounded-2xl text-amber-300 hover:bg-white hover:border-[#ff5100]" 
        onClick={() => {
          onContinue();
          onHandle?.();
        }}>Continue</button>
      </div>
    </>
  )
}
