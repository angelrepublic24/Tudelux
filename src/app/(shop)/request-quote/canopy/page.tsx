import { StepCanopy } from '@/components/Product/Steps/StepKindOfProduct';
import { StepSize } from '@/components/Product/Steps/StepSize';
import { ProductType } from '@/components/ProductType/ProductType'
import { productTypes } from '@/utils/productType'

export default function CanopyPage(){
    const productArchitectural = productTypes[1].type!
    
  return (
    <div className='flex flex-col '>
       <StepCanopy canopyTypes={productArchitectural}/>
       <StepSize />
        
    </div>
  )
}
