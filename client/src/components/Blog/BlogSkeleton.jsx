import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function BlogSkeleton() {
  return (
    <>
      <Stack className="flex-row pb-5">
        <Skeleton variant="rounded" width={290} height={140} />
        <div className="w-100 ps-4 mt-0 d-flex flex-column justify-content-between">
          <Skeleton variant="rounded" height={60} className="mt-0 w-100" />
          <Skeleton
            variant="rounded"
            height={16}
            width={225}
            className="mt-0"
          />
          <Skeleton variant="rounded" height={40} className="mt-0 w-100" />
        </div>
      </Stack>

      <Stack className="flex-row justify-content-between pb-5">
        <Skeleton variant="rounded" width={290} height={140} />
        <div className="w-100 ps-4 mt-0 d-flex flex-column justify-content-between">
          <Skeleton variant="rounded" height={60} className="mt-0 w-100" />
          <Skeleton
            variant="rounded"
            height={16}
            width={225}
            className="mt-0"
          />
          <Skeleton variant="rounded" height={40} className="mt-0 w-100" />
        </div>
      </Stack>

      <Stack className="flex-row justify-content-between pb-5">
        <Skeleton variant="rounded" width={290} height={140} />
        <div className="w-100 ps-4 mt-0 d-flex flex-column justify-content-between">
          <Skeleton variant="rounded" height={60} className="mt-0 w-100" />
          <Skeleton
            variant="rounded"
            height={16}
            width={225}
            className="mt-0"
          />
          <Skeleton variant="rounded" height={40} className="mt-0 w-100" />
        </div>
      </Stack>

      <Stack className="flex-row justify-content-between pb-5">
        <Skeleton variant="rounded" width={290} height={140} />
        <div className="w-100 ps-4 mt-0 d-flex flex-column justify-content-between">
          <Skeleton variant="rounded" height={60} className="mt-0 w-100" />
          <Skeleton
            variant="rounded"
            height={16}
            width={225}
            className="mt-0"
          />
          <Skeleton variant="rounded" height={40} className="mt-0 w-100" />
        </div>
      </Stack>

      <Stack className="flex-row justify-content-between pb-5">
        <Skeleton variant="rounded" width={290} height={140} />
        <div className="w-100 ps-4 mt-0 d-flex flex-column justify-content-between">
          <Skeleton variant="rounded" height={60} className="mt-0 w-100" />
          <Skeleton
            variant="rounded"
            height={16}
            width={225}
            className="mt-0"
          />
          <Skeleton variant="rounded" height={40} className="mt-0 w-100" />
        </div>
      </Stack>
    </>
  );
}
