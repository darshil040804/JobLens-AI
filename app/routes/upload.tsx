import React, {useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";

const Upload = () => {

    const [isProcessing, setIsProcessing] = useState(false)
    const [statusText, setStatusText] = useState('')
    const [file, setFile] = useState<File | null>(null)
    
    const handleFileSelect = (file:File | null) => {
        setFile(file)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name');
        const jobTitle = formData.get('job-title');
        const jobDescription = formData.get('job-description');

        console.log({
            companyName, jobTitle, jobDescription, file
        })
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />
            <section className='main-section'>
                <div className='page-heading py-16'>
                    <h1>
                        Smart Feedback for Your Dream Job
                    </h1>
                    {isProcessing ? (
                        <>
                            <h2>
                                {statusText}
                            </h2>
                            <img src="/images/resume-scan.gif" className="w-full" alt="resume-scan" />
                        </>
                    ) : (
                        <h2>
                            Drop your Resume for an ATS score and improvement tips
                        </h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">
                                    Company Name
                                </label>
                                <input type="text" name="company-name" id="company-name" placeholder="Enter Your Company Name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="Job Title">
                                    Job Title
                                </label>
                                <input type="text" name="job-title" id="job-title" placeholder="Enter Your Job Title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="Job Description">
                                    Job Description
                                </label>
                                <textarea rows={5} name="job-description" id="job-description" placeholder="Enter Your Job Description" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="uploader">
                                    Upload Resume
                                </label>
                                <FileUploader onFileSelect={handleFileSelect} />
                                <button className="primary-button" type="submit">
                                    Analyze Resume
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
