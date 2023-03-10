import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/footer'
import Header from '../components/Header'

const Checkout = () => {
  return (
    <>
    <Header/>
     {/* <!-- checkout wrapper --> */}
    <div class="container lg:grid grid-cols-12 gap-6 items-start pb-16 pt-4">
        {/* <!-- checkout form --> */}
        <div class="lg:col-span-8 border border-gray-200 px-4 py-4 rounded">
            <form action="">
                <h3 class="text-lg font-medium capitalize mb-4">
                    checkout
                </h3>

                <div class="space-y-4">
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                First Name <span class="text-primary">*</span>
                            </label>
                            <input type="text" class="input-box"/>
                        </div>
                        <div>
                            <label class="text-gray-600 mb-2 block">
                                Last Name <span class="text-primary">*</span>
                            </label>
                            <input type="text" class="input-box"/>
                        </div>
                    </div>
                    <div>
                        <label class="text-gray-600 mb-2 block">
                            Company Name
                        </label>
                        <input type="text" class="input-box"/>
                    </div>
                    <div>
                        <label class="text-gray-600 mb-2 block">
                            County/Region <span class="text-primary">*</span>
                        </label>
                        <input type="text" class="input-box"/>
                    </div>
                    <div>
                        <label class="text-gray-600 mb-2 block">
                            Street Address <span class="text-primary">*</span>
                        </label>
                        <input type="text" class="input-box"/>
                    </div>
                    <div>
                        <label class="text-gray-600 mb-2 block">
                            Town/City <span class="text-primary">*</span>
                        </label>
                        <input type="text" class="input-box"/>
                    </div>
                    <div>
                        <label class="text-gray-600 mb-2 block">
                            Zip Code <span class="text-primary">*</span>
                        </label>
                        <input type="text" class="input-box"/>
                    </div>
                    <div>
                        <label class="text-gray-600 mb-2 block">
                            Phone Number <span class="text-primary">*</span>
                        </label>
                        <input type="text" class="input-box"/>
                    </div>
                    <div>
                        <label class="text-gray-600 mb-2 block">
                            Email Address <span class="text-primary">*</span>
                        </label>
                        <input type="text" class="input-box"/>
                    </div>
                </div>
            </form>
        </div>
        {/* <!-- checkout form end --> */}

        {/* <!-- order summary --> */}
        <div class="lg:col-span-4 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
            <h4 class="text-gray-800 text-lg mb-4 font-medium uppercase">ORDER SUMMARY</h4>
            <div class="space-y-2">
                <div class="flex justify-between" v-for="n in 3">
                    <div>
                        <h5 class="text-gray-800 font-medium">Italian Shape Sofa</h5>
                        <p class="text-sm text-gray-600">Size: M</p>
                    </div>
                    <p class="text-gray-600">x3</p>
                    <p class="text-gray-800 font-medium">$320</p>
                </div>
            </div>
            <div class="flex justify-between border-b border-gray-200 mt-1">
                <h4 class="text-gray-800 font-medium my-3 uppercase">Subtotal</h4>
                <h4 class="text-gray-800 font-medium my-3 uppercase">$320</h4>
            </div>
            <div class="flex justify-between border-b border-gray-200">
                <h4 class="text-gray-800 font-medium my-3 uppercase">Shipping</h4>
                <h4 class="text-gray-800 font-medium my-3 uppercase">Free</h4>
            </div>
            <div class="flex justify-between">
                <h4 class="text-gray-800 font-semibold my-3 uppercase">Total</h4>
                <h4 class="text-gray-800 font-semibold my-3 uppercase">$320</h4>
            </div>

           

            {/* <!-- checkout --> */}
            <Link to="/order-complete" class="bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:bg-transparent
         hover:text-primary transition text-sm w-full block text-center">
                Place order
            </Link>
            {/* <!-- checkout end --> */}
        </div>
        {/* <!-- order summary end --> */}
    </div>
    {/* <!-- checkout wrapper end --> */}

    <Footer/>
    </>
  )
}

export default Checkout