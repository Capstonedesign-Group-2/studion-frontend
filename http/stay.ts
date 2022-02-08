import cookie from "cookie"
import { GetServerSidePropsContext, PreviewData } from "next"
import { ParsedUrlQuery } from "querystring"

import { getUser } from "../redux/actions/user"

export const stayLoggedIn = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>, store: any) => {
  const parsedCookies = context.req
    ? cookie.parse(context.req.headers.cookie || "")
    : ""
  if (parsedCookies && parsedCookies["accessToken"]) {
    const accessToken = parsedCookies["accessToken"]
    await store.dispatch(getUser({
      accessToken: accessToken,
    }))
  }
}