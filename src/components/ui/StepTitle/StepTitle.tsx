import React from 'react'

type Props = {
    step:number;
    title: string;
}

export const StepTitle = ({step, title}: Props) => {
  return (
    <>
        <div className="flex items-center gap-4 my-10">
        <h4 className="text-[#ff5100] font-semibold text-4xl  whitespace-nowrap">
          <span className="bg-[#ece83a] py-3 px-4 rounded-4xl mr-2">{step}</span>
          {title}
        </h4>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
    </>
  )
}
