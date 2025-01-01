type InfoItemProps = {
  title: string;
  postfix?: string;
  value: string | number | null;
};

const InfoItem: React.FC<InfoItemProps> = ({ title, value, postfix = "" }) => {
  return (
    <div className="text-xs flex text-nowrap">
      <span className="font-bold ">{title}:</span>
      <hr className="w-full border-dashed border-2 mx-2 my-auto " />
      <span className="">{value ? value + " " + postfix : "-"}</span>
    </div>
  );
};
export default InfoItem;
