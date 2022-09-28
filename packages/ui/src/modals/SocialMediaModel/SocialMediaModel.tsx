// TODO: needs a test file
/* eslint-disable camelcase */

import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { Button, Modal, TextArea, TextField } from "ui";

export interface ISocialMediaModelProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (val: any) => void;
  showModal?: boolean;
}

export const SocialMediaModel = ({
  onSubmit,
  showModal,
}: ISocialMediaModelProps) => {
  const [description, setDescription] = useState("");
  const [bio, setBio] = useState("");

  const [links, setLinks] = useState<{
    github: string | null;
    twitter: string | null;
  }>({
    github: null,
    twitter: null,
  });

  const handleSubmit = () => {
    const data = {
      bio: bio,
      description: description,
      links: links,
    };

    onSubmit!(data);
  };

  return (
    <Modal open={showModal} closeOnEsc={false}>
      <div className={`h-7/10 w-full px-2`}>
        <div className="flex flex-col ">
          <div className="flex content-center	items-center justify-center justify-items-center">
            <span className="text-base font-semibold tracking-wide">
              Let&lsquo;s finish up your project profile before we launch it!
            </span>
          </div>
          <div className="mt-5 flex flex-row content-end justify-between justify-items-stretch">
            <div>
              <div>
                <span className="text-sm font-semibold tracking-wide">
                  One liner:
                </span>
                <TextField
                  // value={String(previousProjects.title)}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Start typing here"
                  radius="rounded"
                  maxLength={100}
                />
              </div>
              <div className="mt-3">
                <span className="text-sm font-semibold tracking-wide">
                  Short description:
                </span>
                <TextArea
                  name="description"
                  placeholder={`Start typing here`}
                  rows={5}
                  className="border-1 text-xs"
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={280}
                />
              </div>
            </div>
            <div className="flex-start flex flex-col">
              <div>
                <span className="text-sm font-semibold tracking-wide">
                  Add link for your project:
                </span>
              </div>
              {/* <div className="flex flex-row content-center items-center justify-between">
                <AiFillGithub size={25} />

                <div>
                  <TextField
                    // value={String(previousProjects.title)}
                    onChange={(e) => console.log(e.target.value)}
                    placeholder="DeWork"
                    radius="rounded"
                  />
                </div>
              </div> */}
              <div className="flex flex-col">
                <div className="mt-1 flex flex-row content-center items-center justify-between">
                  <AiFillGithub size={25} />

                  <div>
                    <TextField
                      // value={String(previousProjects.title)}
                      onChange={(e) =>
                        setLinks({ ...links, github: e.target.value })
                      }
                      placeholder="Github url"
                      radius="rounded"
                    />
                  </div>
                </div>
                <div className="mt-2 flex flex-row content-center items-center justify-between">
                  <FaTwitter size={25} />

                  <div>
                    <TextField
                      // value={String(previousProjects.title)}
                      onChange={(e) =>
                        setLinks({ ...links, twitter: e.target.value })
                      }
                      placeholder="Twitter url"
                      radius="rounded"
                    />
                  </div>
                </div>
                {/* <div className="mt-2 flex flex-row content-center items-center justify-between">
                  <SiNotion size={25} />

                  <div className="ml-2">
                    <TextField
                      // value={String(previousProjects.title)}
                      onChange={(e) => console.log(e.target.value)}
                      placeholder="Notion Link"
                      radius="rounded"
                    />
                  </div>
                </div> */}
                {/* <div className="mt-1 flex flex-row content-center items-center justify-between">
                <AiFillGithub size={25} />

                <div className="ml-3">
                  <TextField
                    // value={String(previousProjects.title)}
                    onChange={(e) => console.log(e.target.value)}
                    placeholder="Lens Id"
                    radius="rounded"
                  />
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`bottom-2 mt-8  flex w-full justify-center`}>
        {/* <Button variant={`default`} onClick={() => console.log("asas")}>
          Go to role page
        </Button> */}
        <Button variant={`default`} onClick={handleSubmit}>
          All done !
        </Button>
      </div>
    </Modal>
  );
};
