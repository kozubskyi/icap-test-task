// 'use client'

// import { signIn } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import { useState } from 'react'
// import { useForm, SubmitHandler } from 'react-hook-form'
// import axios from 'axios'

// export type Inputs = {
// 	username: string
// 	password: string
// }

// export default function EditForm() {
// 	const [isPasswordShown, setIsPasswordShown] = useState(false)
// 	const [isLoading, setIsLoading] = useState(false)
// 	const [errorMessage, setErrorMessage] = useState('')
// 	const router = useRouter()

// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors, isValid },
// 		// reset,
// 	} = useForm<Inputs>({ mode: 'onTouched' })

// 	const onChange = () => {
// 		setErrorMessage('')
// 	}

// 	const onSubmit: SubmitHandler<Inputs> = async data => {
// 		try {
// 			setIsLoading(true)

// 			await login(data)
// 			await signIn('credentials', { ...data, redirect: false })

// 			router.push('/table')
// 			setIsPasswordShown(false)
// 			// reset()
// 		} catch (error: any) {
// 			if (axios.isAxiosError(error)) {
// 				const { response } = error

// 				if (response?.status === 401) return setErrorMessage('Invalid username or password')

// 				return setErrorMessage(`Error ${response?.status}. ${response?.statusText}`)
// 			}

// 			setErrorMessage(error.message)
// 		} finally {
// 			setIsLoading(false)
// 		}
// 	}

// 	return (
// 		<form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 flex flex-col p-4 border border-gray-200 rounded-lg">
// 			<div className="flex flex-col">
// 				<label htmlFor="username">Username:</label>
// 				<input
// 					className="px-2 py-1 border border-gray-200 rounded-md w-80"
// 					type="text"
// 					id="username"
// 					placeholder="kozubskyi"
// 					{...register('username', {
// 						required: 'Username is required',
// 						minLength: {
// 							value: 1,
// 							message: 'Username must be greater than 1 character',
// 						},
// 						maxLength: {
// 							value: 150,
// 							message: 'Username must be less than 150 characters',
// 						},
// 						onChange,
// 					})}
// 				/>
// 				<p className="h-4 text-red-500 text-xs ml-1">{errors?.username?.message}</p>
// 			</div>
// 			<div className="flex flex-col relative">
// 				<label htmlFor="password">Password:</label>
// 				<input
// 					className="px-2 py-1 border border-gray-200 rounded-md w-80"
// 					type={isPasswordShown ? 'text' : 'password'}
// 					id="password"
// 					placeholder="********"
// 					{...register('password', {
// 						required: 'Password is required',
// 						minLength: {
// 							value: 1,
// 							message: 'Password must be greater than 3 characters',
// 						},
// 						maxLength: {
// 							value: 128,
// 							message: 'Password must be less than 128 characters',
// 						},
// 						onChange,
// 					})}
// 				/>
// 				<p className="h-4 text-red-500 text-xs ml-1">{errors?.password?.message}</p>
// 				<button
// 					type="button"
// 					className="absolute bottom-6 right-3 bg-transparent border-none"
// 					onClick={() => setIsPasswordShown(prev => !prev)}
// 				>
// 					<Icon
// 						icon={isPasswordShown ? 'akar-icons:eye-open' : 'akar-icons:eye-slashed'}
// 						color="rgb(215, 218, 224)"
// 						fontSize={18}
// 					/>
// 				</button>
// 			</div>
// 			<button
// 				type="submit"
// 				className="bg-green-600 text-white font-semibold mt-4 px-2 py-1 border border-gray-100 rounded-md"
// 				disabled={!isValid || isLoading}
// 			>
// 				Log in
// 			</button>
// 			<p className="h-4 text-red-500 text-xs ml-1">{errorMessage}</p>
// 		</form>
// 	)
// }
