/* eslint-disable react/prop-types */
const SendRequest = ({ product }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Send a Request</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <select className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>100</option>
            </select>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-lg font-semibold text-red-500">
              {product?.price}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-500">Graphic Design Fee</p>
            <p className="text-lg font-semibold">₦5,000</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Please include all contact details and information you want in
              your design here. Add all remarks, preferred colours, references
              and additional instructions here.
            </label>
            <textarea
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload design (e.g. logo) asset if any
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              I have a logo
            </label>
          </div>
          <button className="w-full bg-red-300 text-white px-4 py-2 rounded">
            Upload
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{product?.name}</h3>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
          <div className="mt-4">
            <h4 className="font-semibold">Product Specifications</h4>
            <button className="mt-2 text-blue-600 underline">
              Change Specifications
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendRequest;
