// TODO: needs a test file
import { Button, Modal, TextArea, TextField } from "@eden/package-ui";
import { AiFillGithub } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { SiNotion } from "react-icons/si";

export interface ISocialMediaModelProps {
  onSubmit?: () => void;
  showModal?: boolean;
}

export const SocialMediaModel = ({
  // onSubmit,
  showModal,
}: ISocialMediaModelProps) => {
  return (
    <Modal open={showModal} closeOnEsc={false}>
      <div className={`h-7/10 w-full px-2`}>
        <div className="flex flex-col ">
          <div className="flex content-center	items-center justify-center justify-items-center">
            <span className="text-base font-semibold tracking-wide">
              Let'sfinish up your project profile before we launch it!
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
                  onChange={(e) => console.log(e.target.value)}
                  placeholder="Start typing here"
                  radius="rounded"
                />
              </div>
              <div className="mt-3">
                <span className="text-sm font-semibold tracking-wide">
                  Short description:
                </span>
                <TextArea
                  name="bio"
                  placeholder={`Start typing here`}
                  rows={5}
                  className="border-1 text-xs"
                  debounceTime={2000}
                  onChange={() => {
                    console.log("sss");
                  }}
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
                      onChange={(e) => console.log(e.target.value)}
                      placeholder="Github Id"
                      radius="rounded"
                    />
                  </div>
                </div>
                <div className="mt-2 flex flex-row content-center items-center justify-between">
                  <FaDiscord size={25} />

                  <div>
                    <TextField
                      // value={String(previousProjects.title)}
                      onChange={(e) => console.log(e.target.value)}
                      placeholder="Discord Id"
                      radius="rounded"
                    />
                  </div>
                </div>
                <div className="mt-2 flex flex-row content-center items-center justify-between">
                  <SiNotion size={25} />

                  <div className="ml-2">
                    <TextField
                      // value={String(previousProjects.title)}
                      onChange={(e) => console.log(e.target.value)}
                      placeholder="Notion Link"
                      radius="rounded"
                    />
                  </div>
                </div>
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
      <div className={`bottom-2 mt-8  flex w-full justify-between`}>
        <Button variant={`default`} onClick={() => console.log("asas")}>
          Go to role page
        </Button>
        <Button variant={`default`} onClick={() => console.log("asas")}>
          All done !
        </Button>
      </div>
    </Modal>
  );
};
