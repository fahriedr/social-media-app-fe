import {Routes, Route} from 'react-router-dom'
import './globals.css'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Home } from './_root/pages'
import { Toaster } from '@/components/ui/toaster'
import Explorer from './_root/pages/Explorer'
import Saved from './_root/pages/Saved'
import AllUsers from './_root/pages/AllUsers'
import CreatePost from './_root/pages/CreatePost'
import EditPost from './_root/pages/EditPost'
import PostDetails from './_root/pages/PostDetails'
import Profile from './_root/pages/Profile'
import UpdateProfile from './_root/pages/UpdateProfile'
import LikedPosts from './_root/pages/LikedPosts'

const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* Public routes */}
            <Route element={<AuthLayout/>}>
                <Route path='/sign-in' element={<SigninForm/>}/>
                <Route path='/sign-up' element={<SignupForm/>}/>
            </Route>

            {/* Private routes */}
            <Route element={<RootLayout/>}>
                <Route index element={<Home/>}/>
                <Route path='/explore' element={<Explorer/>}/>
                <Route path='/saved' element={<Saved/>}/>
                <Route path='/all-users' element={<AllUsers/>}/>
                <Route path='/create-post' element={<CreatePost/>}/>
                <Route path='/edit-post' element={<EditPost/>}/>
                <Route path='/posts/:id' element={<PostDetails/>}/>
                <Route path='/profile/:id/*' element={<Profile/>}/>
                <Route path='/update-profile/:id/*' element={<UpdateProfile/>}/>
                <Route path='/liked-posts' element={<LikedPosts/>}/>

                
            </Route>
        </Routes>
        <Toaster />
    </main>
  )
}

export default App