import React from 'react'
import FormGenerator from '../../forms-generator'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'
import { Send } from 'lucide-react'
import { useChats } from '@/hooks/useChat'

type Props = {
    channelId: string
}

const InputDiv = ({channelId}: Props) => {
    const { errors, isPending, onFormSubmit, register } = useChats(channelId)
    // console.log(useChats(channelId))
    return (
        <form className="absolute bottom-0 w-[70%] z-10" onSubmit={onFormSubmit}>
            {/* {close && ( */}

            <FormGenerator
                register={register}
                errors={errors}
                placeholder={'yaha html'}
                name='chatam'
                inputType='textarea'
                lines={8}
                type='text'
            />
            <Button
                className='p-0 bg-transparent absolute bottom-2 right-3 hover:bg-transparent' type='submit'>
                <Loader state={isPending}>
                    <Send className='text-white/50 cursor-pointer hover:text-white/80' size={18} />
                </Loader>
            </Button>
        </form>
    )
}
  

export default InputDiv