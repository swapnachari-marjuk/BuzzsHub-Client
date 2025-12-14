import React from "react";

const HowBuzzHubWorks = () => {
  return (
    <section className="my-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl text-pink-500 font-bold text-center mb-12">
          How Buzz&apos;sHub Works
        </h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {/* FAQ 1 */}
          <div className="collapse collapse-plus bg-base-100 shadow-md rounded-xl">
            <input type="radio" name="buzzhub-faq" defaultChecked />
            <div className="collapse-title text-lg font-semibold">
              What is Buzz&apos;sHub?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Buzz&apos;sHub is a platform where you can discover, explore,
                and join different clubs based on your interests, activities,
                and passions.
              </p>
            </div>
          </div>

          {/* FAQ 2 */}
          <div className="collapse collapse-plus bg-base-100 shadow-md rounded-xl">
            <input type="radio" name="buzzhub-faq" />
            <div className="collapse-title text-lg font-semibold">
              How can I join a club?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Simply browse through the available clubs, view their details,
                and click on the <strong>View Details</strong> button to go
                Details Page. And there you can see a button join. Click it to
                join.
              </p>
            </div>
          </div>

          {/* FAQ 3 */}
          <div className="collapse collapse-plus bg-base-100 shadow-md rounded-xl">
            <input type="radio" name="buzzhub-faq" />
            <div className="collapse-title text-lg font-semibold">
              Do I need to pay to join a club?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Some clubs may have a membership fee, while others are
                completely free. The fee details are clearly shown on each
                club&apos;s page.
              </p>
            </div>
          </div>

          {/* FAQ 4 */}
          <div className="collapse collapse-plus bg-base-100 shadow-md rounded-xl">
            <input type="radio" name="buzzhub-faq" />
            <div className="collapse-title text-lg font-semibold">
              Can I view club details before joining?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Yes! You can view full club information including description,
                category, and membership fee before making any decision.
              </p>
            </div>
          </div>

          {/* FAQ 5 */}
          <div className="collapse collapse-plus bg-base-100 shadow-md rounded-xl">
            <input type="radio" name="buzzhub-faq" />
            <div className="collapse-title text-lg font-semibold">
              Is Buzz&apos;sHub free to use?
            </div>
            <div className="collapse-content text-gray-600">
              <p>
                Yes, Buzz&apos;sHub is completely free to browse and explore.
                You only pay if a specific club requires a membership fee.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowBuzzHubWorks;
