import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ComponentType } from "react";

interface AuthentificationGuardProps {
  component: ComponentType;
}

export const AuthenticationGuard = ({
  component,
}: AuthentificationGuardProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <p>Access Denied </p>
        <p>...</p>
        <p>(lol jk implement proper error msg later)</p>
        {/* <PageLoader /> */}
      </div>
    ),
  });

  return <Component />;
};
