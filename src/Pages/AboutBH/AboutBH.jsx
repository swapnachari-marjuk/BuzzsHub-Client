import React from 'react';

const AboutBH = () => {
    const aboutData = {
        "shortIntro": {
            "title": "Why Buzz’sHub Exists",
            "content": "At Buzz’sHub, we believe that some of the greatest ideas and friendships start with a simple conversation. We exist to bridge the gap—turning the 'where do I go?' into 'here’s where I belong.'"
        },
        "whoItsFor": {
            "title": "Who It’s For",
            "content": "This is a space for the curious minds, the doers, and the dreamers. Whether you are someone looking to learn a new skill or a leader ready to spark a movement—Buzz’sHub is for you."
        },
        "values": [
            { "label": "Accessibility", "desc": "Opportunities should be open to everyone.", "icon": "🌍" },
            { "label": "Empowerment", "desc": "Tools to build your own communities.", "icon": "🛠️" },
            { "label": "Growth", "desc": "Meaningful participation builds character.", "icon": "📈" }
        ],
        "identity": "Buzz’sHub: Where Passions Find a Pulse and Communities Find a Home."
    };
    return (
        <section className="py-20 my-10 rounded-2xl shadow-sm bg-linear-to-b from-white to-pink-50">
            <div className="max-w-6xl mx-auto px-6">

                {/* Intro & Who Its For Section */}
                <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-pink-500 pl-4">
                            {aboutData.shortIntro.title}
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {aboutData.shortIntro.content}
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-pink-100">
                        <h2 className="text-2xl font-bold text-pink-500 mb-4">
                            {aboutData.whoItsFor.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {aboutData.whoItsFor.content}
                        </p>
                    </div>
                </div>

                {/* Values Grid */}
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-semibold text-gray-700 uppercase tracking-widest mb-8">Our Core Values</h3>
                    <div className="grid sm:grid-cols-3 gap-8">
                        {aboutData.values.map((value, index) => (
                            <div key={index} className="p-6 bg-white rounded-xl hover:shadow-md transition-shadow border-b-4 border-pink-400">
                                <div className="text-3xl mb-4">{value.icon}</div>
                                <h4 className="font-bold text-gray-800 mb-2">{value.label}</h4>
                                <p className="text-sm text-gray-500">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final Identity Tagline */}
                <div className="mt-20 text-center">
                    <div className="inline-block px-8 py-4 bg-pink-500 rounded-full shadow-lg transform hover:scale-105 transition">
                        <p className="text-white font-medium md:text-xl italic">
                            "{aboutData.identity}"
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutBH;

