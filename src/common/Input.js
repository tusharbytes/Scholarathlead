const Input = ({ label, type, placeholder, name, value, onChange, error }) => {
    return (
        <>
            <label className="block text-left mb-2 text-[13px] font-semibold">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`p-2 border-t-0 border-b-[1px] border-[#0000004D] w-[100%] ${error ? "border-red-500" : "border-black"
                    } border-opacity-50 focus:outline-none focus:border-blue-500`}
            />
            {error && <p className="text-red-500    ">{error}</p>}
        </>
    );
};

export default Input;
