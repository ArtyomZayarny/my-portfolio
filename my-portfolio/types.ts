export type ChildrenProps = {
  children: React.ReactNode;
};

export type ModalContextType = {
  isModalOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
};

export type DataTabItemType = {
  title: string;
  id: string;
  content: React.ReactNode;
};

export interface IProject {
  id: number;
  title: string;
  image: string;
  description?: string;
  tag: ProjectTagsEnum[];
  gitUrl: string;
  previewUrl: string;
}

export enum ProjectTagsEnum {
  All = "All",
  Web = "Web",
  Mobile = "Mobile",
}
