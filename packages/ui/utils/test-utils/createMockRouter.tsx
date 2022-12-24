import { RouterContext } from "next/dist/shared/lib/router-context";
import { NextRouter } from "next/router";
import { ReactNode } from "react";
export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    ...router,
  } as NextRouter;
}

export const MockRouter = ({
  children,
  options,
}: {
  children: ReactNode;
  options?: Partial<NextRouter>;
}) => {
  const router = createMockRouter(options ?? {});

  return (
    <RouterContext.Provider value={createMockRouter({})}>
      {children}
    </RouterContext.Provider>
  );
};
