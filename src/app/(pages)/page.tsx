"use client";
import CompanyList from "@/components/CompanyList";
import { Company } from "@/types/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const pageSize = 5;
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCompanies, setSelectedCompanies] = useState<Set<number>>(
    new Set()
  );
  const [loading, setLoading] = useState(false);
  const [allCompaniesFetched, setAllCompaniesFetched] =
    useState<boolean>(false);

  const fetchCompanies = async (page: number) => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/companies", {
        params: {
          page,
          limit: pageSize,
        },
      });

      if (data.length < pageSize) {
        setAllCompaniesFetched(true);
      }

      setCompanies((prevCompanies) => [...prevCompanies, ...data]);
    } catch (error) {
      setCompanies([]);
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedCompanies((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
      return newSelection;
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete company number ${[...selectedCompanies]}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const remainingCompanies = companies.filter(
          (company) => !selectedCompanies.has(company.id)
        );
        setCompanies(remainingCompanies);
        setSelectedCompanies(new Set());
        Swal.fire({
          title: "Deleted!",
          text: "Record has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const loadMore = () => {
    if (!loading && !allCompaniesFetched) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchCompanies(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;

      if (
        scrollPosition >= scrollHeight - 100 &&
        !loading &&
        !allCompaniesFetched
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, allCompaniesFetched]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 items-center sm:items-start w-full max-w-[768px]">
        <div className="min-h-screen flex flex-col md:flex-row gap-10 w-full">
          <div className="w-full md:w-1/3 sticky top-0 bg-[#0a0a0a] py-2">
            <div className="sticky top-10 flex flex-col gap-2">
              <button
                onClick={scrollToTop}
                className="bg-blue-600 p-2 rounded-lg cursor-pointer w-full"
                type="button"
              >
                Scroll to top
              </button>
              <button
                onClick={handleDelete}
                disabled={selectedCompanies.size === 0}
                className={`p-2 rounded-lg w-full ${
                  selectedCompanies.size === 0
                    ? "bg-gray-200 text-black"
                    : "bg-red-600"
                }`}
                type="button"
              >
                Delete Selected Companies
              </button>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl font-bold mb-4">Company Dashboard</h1>
            {companies ? (
              <CompanyList
                companies={companies}
                selectedCompanies={selectedCompanies}
                toggleSelect={toggleSelect}
              />
            ) : (
              <div className="flex gap-2 ">
                <span>No record found</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-mood-empty"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M9 10l.01 0" />
                  <path d="M15 10l.01 0" />
                  <path d="M9 15l6 0" />
                </svg>
              </div>
            )}

            {loading && (
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
