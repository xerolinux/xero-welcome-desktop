import { CardHeader } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";

import post from "../assets/post.png";

export default function PostHeader() {
  return (
    <CardHeader
      style={{ backgroundImage: `linear-gradient(185deg, #FF0076, #590FB7)` }}
      className="relative"
    >
      <Stack direction="row" style={{ justifyContent: "space-between" }}>
        <Link to={"/"}>
          <div className="pt-10 pl-2">
            <button
              type="button"
              class="text-white bg-gradient-to-r from-blue-600 to-green-600 hover:bg-gradient-to-r focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm py-2.5 text-center flex"
            >
              <svg
                class="w-6 h-6 mr-2"
                style={{ marginTop: -2 }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Go Back
            </button>
          </div>
        </Link>
      </Stack>
      <div className="row">
        <img
          src={post}
          alt="Post Install"
          style={{ height: 200, width: 600, marginTop: -60 }}
        />
      </div>
    </CardHeader>
  );
}