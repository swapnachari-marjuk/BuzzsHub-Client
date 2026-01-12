import React, { useState } from 'react';
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone } from 'react-icons/hi';
import { IoSend } from 'react-icons/io5';

const Contact = () => {

    // const [result, setResult] = useState("");

    // const onSubmit = async (event) => {
    //     event.preventDefault();
    //     setResult("Sending....");
    //     const formData = new FormData(event.target);

    //     formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    //     const response = await fetch("https://api.web3forms.com/submit", {
    //         method: "POST",
    //         body: formData
    //     });

    //     const data = await response.json();

    //     if (data.success) {
    //         setResult("Form Submitted Successfully");
    //         event.target.reset();
    //     } else {
    //         console.log("Error", data);
    //         setResult(data.message);
    //     }
    // };

    return (
        <div className="min-h-screen my-10 rounded-2xl shadow-sm bg-white py-16 px-6">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-16">
                    <span className="text-pink-500 font-bold uppercase tracking-widest text-sm italic">Contact Us</span>
                    <h1 className="text-4xl font-extrabold text-gray-800 mt-2">Let’s Start a <span className="text-pink-500">Conversation</span></h1>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                        Have a question or an idea? Tell us about it. We’re here to help you connect and grow within the community.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">

                    {/* Info Side */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-pink-50 p-8 rounded-3xl border border-pink-100 group hover:bg-pink-500 transition-all duration-300">
                            <div className="bg-white p-3 rounded-2xl inline-block shadow-sm">
                                <HiOutlineMail className="text-pink-500" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mt-4 group-hover:text-white transition-colors">Email Us</h3>
                            <p className="text-gray-600 group-hover:text-pink-50 transition-colors">marjukmujaddedi@gmail.com</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="bg-pink-50 p-3 rounded-2xl inline-block">
                                <HiOutlineLocationMarker className="text-pink-500" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mt-4">Visit Us</h3>
                            <p className="text-gray-600">Dhaka, Bangladesh</p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl border border-pink-50 shadow-sm">
                        <form
                            // onSubmit={onSubmit}
                            className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                    <input type="text" required placeholder="Your Name" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-pink-300 focus:outline-none focus:bg-white transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                    <input type="email" required placeholder="example@mail.com" className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-pink-300 focus:outline-none focus:bg-white transition-all" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                <textarea rows="5" required placeholder="Tell us how we can help..." className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-pink-300 focus:outline-none focus:bg-white transition-all"></textarea>
                            </div>

                            <button className="w-full md:w-auto px-12 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-pink-100 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95">
                                Send Message <IoSend size={20} />
                            </button>

                            {/* <span>{result}</span> */}
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact