import { useTranslation } from "react-i18next";

export const NotFound = () => {
  const { t } = useTranslation();
  return <div>{t("notFound.text")}</div>;
};
