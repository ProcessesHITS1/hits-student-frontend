import { FC, useState } from 'react';
import { Input } from './common/Input';
import { H2 } from './common/Headers';
import { Button } from './common/Button';

export const Login: FC = () => {
    return (
        <div className='flex justify-center items-center h-full w-full'>
            <div className='h-full w-full bg-cover bg-tsu blur-sm absolute'></div>
            <div className='h-full w-full bg-cover bg-black/25 absolute'></div>
            <LoginCard />
        </div>
    );
}


const LoginCard: FC = () => {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    return (
        <div className="flex flex-col gap-5 border rounded-2xl bg-white md:w-1/2 lg:w-1/3 xl:1/4 py-10 px-8 sm:px-16 justify-center items-center backdrop-blur-lg">
            <H2 text={"Вход в систему"}/>
            <Input type="email" placeholder="E-mail"/>
            <Input type="password" placeholder="Password"/>
            <Button className="bg-blue-500">
                <span className='text-white'>Войти</span>
            </Button>
            <Button className="font-medium">Не получается войти?</Button>
        </div>
    );
}