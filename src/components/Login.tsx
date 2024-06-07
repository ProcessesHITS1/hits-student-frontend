import { FC, useCallback, useState } from 'react';
import { Input } from './common/Input';
import { H2 } from './common/Headers';
import { Button } from './common/Button';
import { useNavigate } from 'react-router-dom';
import { storeAccessToken } from '../infrastructure/access-token-storage';
import { authApi } from '../infrastructure/api-clients';

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
    const [isErrorShown, setIsErrorShown] = useState(false);

    const navigate = useNavigate();

    const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email || !password) return;
        
        const response = await authApi.signIn({ email, password });
        if (response.data.accessToken) {
            storeAccessToken(response.data.accessToken);
            navigate("/profile");
            return;
        }

        setIsErrorShown(true);

    }, [email, password, navigate, setIsErrorShown]);

    const onInputChange = (dispatcher: () => void) => {
        setIsErrorShown(false);
        dispatcher();
    }

    return (
        <div className="flex flex-col gap-5 border rounded-2xl bg-white md:w-1/2 lg:w-1/3 xl:1/4 py-10 px-8 sm:px-16 justify-center items-center backdrop-blur-lg">
            <H2 text={"Вход в систему"}/>
            <form className='flex flex-col gap-5 w-full justify-center items-center' onSubmit={onSubmit}>
                <Input type="email" placeholder="E-mail" onChange={e => onInputChange(() => setEmail(e.target.value))}/>
                <Input type="password" placeholder="Password" onChange={e => onInputChange(() => setPassword(e.target.value))}/>

                {isErrorShown && <span className='text-red-500'>Неверная почта или пароль</span>}
                
                <Button className="bg-blue-500" type="submit">
                    <span className='text-white'>Войти</span>
                </Button>
            </form>
            <Button className="font-medium">Не получается войти?</Button>
        </div>
    );
}