import React, { Suspense } from "react";
import Loading from "@/components/loading";

const lazyWrap = (Component) => (props) => (
    <Suspense fallback={<Loading text="Tunggu sebentar..." />}>
        <Component {...props} />
    </Suspense>
);

export default lazyWrap;