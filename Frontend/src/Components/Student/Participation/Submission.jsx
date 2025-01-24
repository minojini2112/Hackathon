const Submission = (props) => {
    return (
      <div className="flex flex-col justify-center items-center gap-4 border-black rounded-lg border-[3px] shadow-xl w-[80%] mx-auto p-4">
        <div className="w-[100%] flex justify-start items-center gap-3 border-blue-950 border-2 p-2  rounded-lg">
          <i className="fa-solid fa-building-columns fa-xl"></i>
          <input
            type="text"
            placeholder="College / Institution Name"
            name="college"
            onChange={(e) => {
              props.handleInputChange(e);
            }}
            className=" outline-none w-[80%]"
          />
        </div>
        <div className="w-[100%] flex gap-4 justify-center items-center">
          <div className="w-[50%] border-blue-950 border-2 p-2 rounded-lg flex justify-start items-center gap-3">
            <i className="fa-solid fa-laptop fa-xl"></i>
            <input
              type="text"
              placeholder="Event / Competition Name"
              className="w-[80%]  outline-none "
              name="competition_name"
              onChange={(e) => {
                props.handleInputChange(e);
              }}
            />
          </div>
          <div className="w-[50%] border-blue-950 border-2 p-2 rounded-lg flex justify-start items-center gap-3">
            <i className="fa-solid fa-calendar-days fa-xl"></i>
            <input
              type="date"
              placeholder="Date"
              className="outline-none"
              name="date"
              onChange={(e) => {
                props.handleInputChange(e);
              }}
            />
          </div>
        </div>
        <div className="w-[100%] flex gap-4 justify-center items-center">
          <div className="w-[50%] border-blue-950 border-2 p-2 rounded-lg flex justify-start items-center gap-3">
            <i className="fa-solid fa-award fa-xl"></i>
            <input
              type="file"
              placeholder="Certificates (images)"
              name="image"
              className="outline-none"
              multiple 
              onChange={(e)=>{props.imageUpload(e);}}
            />
          </div>
          <div className="w-[50%] border-blue-950 border-2 p-2 rounded-lg flex justify-start items-center gap-3">
            <i className="fa-solid fa-file-pdf fa-xl"></i>
            <input
              type="file"
              placeholder="Report (PDF)"
              name="pdf"
              className="outline-none"
              onChange={(e)=>{props.pdfUpload(e);}}
            />
          </div>
        </div>
        <div>
          <button
            className="p-2 px-4 bg-[#0e2f44] text-white text-lg font-medium hover:bg-[#244960] rounded-lg"
            onClick={() => {
              props.submit();
            }} 
          >
            Submit
          </button>
        </div>
      </div>
    );
  };
  
  export default Submission;
  