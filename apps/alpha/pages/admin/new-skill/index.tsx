/* eslint-disable camelcase */
import { useMutation, useQuery } from "@apollo/client";
import { UserContext } from "@eden/package-context";
import {
  CREATE_SKILL,
  FIND_SKILL,
  FIND_SKILL_CATEGORIES,
  RELATED_SKILLS,
} from "@eden/package-graphql/eden";
import {
  Maybe,
  RoleTemplate,
  RoleType,
  SkillCategory,
  SkillSubCategory,
  SkillType_Member,
} from "@eden/package-graphql/generated";
import {
  AppHeader,
  Button,
  Card,
  GridItemFour,
  GridItemSix,
  GridLayout,
  Loading,
  RoleSelector,
  SearchSkill,
  SkillList,
  TextBody,
} from "@eden/package-ui";
import { Combobox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import _ from "lodash";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";

import type { NextPageWithLayout } from "../../_app";

interface IAppPublicLayoutProps {
  children: React.ReactNode;
}

const AppAdminLayout = ({ children }: IAppPublicLayoutProps) => {
  return (
    <>
      <Head>
        <title>Eden protocol</title>
      </Head>
      <div className="bg-background flex min-h-screen min-w-0 flex-col pb-10 lg:overflow-y-hidden">
        <AppHeader />
        <main className="flex flex-grow">{children}</main>
      </div>
    </>
  );
};

const AdminPanelToAddNewSkill: NextPageWithLayout = () => {
  const currentUser = useContext(UserContext);
  const [relatedSkillFromLight, setRelatedSkillFromLight] =
    useState<Array<SkillFetched>>();
  const [relatedSkillFromEden, setRelatedSkillFromEden] =
    useState<Array<SkillFetched>>();
  const [selectedSkillFromLight, setSelectedSkillFromLight] =
    useState<SkillFetched>();
  const [selectedSkills, setSelectedSkills] = useState<Array<SkillType_Member>>(
    []
  );
  const [skillsFromLight, setSkillsFromLight] = useState<Array<SkillFetched>>(
    []
  );
  const [categories, setCategories] =
    useState<Maybe<Array<Maybe<SkillCategory>>>>();

  const [selectedCategory, setSelectedCategory] =
    useState<Maybe<SkillCategory>>();

  const [selectedSubCategory, setSelectedSubCategory] =
    useState<Maybe<SkillSubCategory>>();
  const [lightSkillsLoading, setLightSkillsLoading] = useState<boolean>(false);
  const [relatedSkillsLoading, setRelatedSkillsLoading] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  ///Querying

  const { loading, error, refetch } = useQuery(FIND_SKILL_CATEGORIES, {
    variables: {
      fields: {
        _id: null,
      },
    },
    onCompleted: (data) => {
      setCategories(data.findSkillCategories);
    },
  });

  ///Mutations

  const [createSkill] = useMutation(CREATE_SKILL);

  const [relatedSkill] = useMutation(RELATED_SKILLS);

  const { refetch: refetchSkill } = useQuery(FIND_SKILL, {
    variables: {
      fields: {
        id_lightcast: "KS127MQ6GC1CMJ5B0737",
      },
    },
  });

  //////////////////////Light Api Call Functions/////////////////////

  const encodedParams = new URLSearchParams();

  function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const id_secret_api_skills = [
    {
      Client_ID: "m46vecvtqj3lckn0",
      Secret: "xCN3Mxn6",
    },
    {
      Client_ID: "85eujv6f8f21zfhc",
      Secret: "4LHf40wS",
    },
    {
      Client_ID: "9yk1g261p7g2t0i5",
      Secret: "jwZU31SB",
    },
    {
      Client_ID: "qcjg10etn9qctsf5",
      Secret: "OUjSVBTD",
    },
    {
      Client_ID: "4ww3czvftfif4kpw",
      Secret: "ITswNHuC",
    },
    {
      Client_ID: "q748vs3rlgltgrsk",
      Secret: "NsYivyQg",
    },
    {
      Client_ID: "jpip3p686thssrfh",
      Secret: "RRwAkm3d",
    },
    {
      Client_ID: "h99r839sf2hvnveq",
      Secret: "ZnUGEpoC",
    },
    {
      Client_ID: "h99r839sf2hvnveq",
      Secret: "OPcGBNvv",
    },
    {
      Client_ID: "qw8alxyyp90dfl04",
      Secret: "S0lwqKAg",
    },
    {
      Client_ID: "8hdhzbzt0y5axxoc",
      Secret: "AvOJYsNe",
    },
    {
      Client_ID: "lfhcv96voab6o4f1",
      Secret: "7JVL0suS",
    },
    {
      Client_ID: "2wpkwt0u41qy66t5",
      Secret: "1wvuup81",
    },
    {
      Client_ID: "je2se307eiq598tm",
      Secret: "odlUJqjq",
    },
    {
      Client_ID: "k8qo4cjr9rlj9zpy",
      Secret: "QHCvapXq",
    },
    {
      Client_ID: "lwtzi7oh8y8kk2wh",
      Secret: "8YWkKVOO",
    },
    {
      Client_ID: "7lhunoecwfjxmkvq",
      Secret: "CgtPDqBf",
    },
    {
      Client_ID: "6m45fs5hbsekhd4o",
      Secret: "1n94fJd8",
    },
    {
      Client_ID: "bhprycmpid4ul6ta",
      Secret: "3xiDjNLe",
    },
    {
      Client_ID: "p7yror6jhglgbggj",
      Secret: "n5AvAEuy",
    },
    {
      Client_ID: "f63gfakpprqysfbj",
      Secret: "yjMkSizL",
    },
    {
      Client_ID: "hq9091qa9jeahm8q",
      Secret: "cXYDsAIn",
    },
    {
      Client_ID: "rctfib9579lgq6g5",
      Secret: "KT3F7ypd",
    },
    {
      Client_ID: "tnpljr44pdhi8z4g",
      Secret: "M7ux8w9u",
    },
    {
      Client_ID: "7fjh59s3ygs658f7",
      Secret: "gySvU6yA",
    },
    {
      Client_ID: "um3b1k2lki6rr7r8",
      Secret: "znOPhxak",
    },
    {
      Client_ID: "nuchdu0yzlpl4hmf",
      Secret: "nexo1sdw",
    },
    {
      Client_ID: "shwfiljis4l9rw2x",
      Secret: "3VIQmwvI",
    },
    {
      Client_ID: "26veu2tjw7x4seqh",
      Secret: "iVxVWGRH",
    },
    {
      Client_ID: "hygvywwop1bqlh3d",
      Secret: "b5ZoBEmT",
    },
    {
      Client_ID: "rd7xgiai94353ipd",
      Secret: "dxah5Wio",
    },
    {
      Client_ID: "mycy71aylcb3er04",
      Secret: "robhpI5p",
    },
    {
      Client_ID: "1pq2m1xxg458hrj6",
      Secret: "j04NuuVE",
    },
    {
      Client_ID: "woctvmsl3ry4cpfa",
      Secret: "XxZvXPlN",
    },
    {
      Client_ID: "hojh932aybnfvuoe",
      Secret: "GJQbp1dM",
    },
    {
      Client_ID: "n35mrr2034japixh",
      Secret: "Z4L2sHKd",
    },
    {
      Client_ID: "84ej9q9novdw62oi",
      Secret: "SSwbDFaJ",
    },
    {
      Client_ID: "xqh4ih3vm39vt1gx",
      Secret: "JvmGsuY4",
    },
    {
      Client_ID: "au0t7mvyhcghskhn",
      Secret: "oaUjghDj ",
    },
    {
      Client_ID: "p3p8rlswrs7t11pw",
      Secret: "JOXJKHU5",
    },
    {
      Client_ID: "d1gg9cholmaug6pv",
      Secret: "KGFdQvoj",
    },
  ];

  const fetchToken = async () => {
    const rand = getRndInteger(0, 40);

    encodedParams.set("client_id", id_secret_api_skills[rand].Client_ID);
    encodedParams.set("client_secret", id_secret_api_skills[rand].Secret);

    encodedParams.set("grant_type", "client_credentials");
    encodedParams.set("scope", "emsi_open");

    const tokenOptions = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodedParams,
    };

    try {
      const response = await fetch(
        `https://auth.emsicloud.com/connect/token`,
        tokenOptions
      );
      const data = await response.json();

      return data?.access_token;
    } catch (err) {
      console.log(err);
    }
  };

  interface SkillFetched {
    category?: { id: number; name: string };
    id: string;
    name: string;
    subcategory?: { id: number; name: string };
    type?: { id: string; name: string };
  }

  async function fetchSkills(skill: string) {
    try {
      const accessToken = await fetchToken();
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(
        //********if you want to fetch every single skill just remove the q=asdadasdad from the url************* SOS 🆘
        `https://emsiservices.com/skills/versions/latest/skills?q=${skill}&fields=id,name,category,type,subcategory&typeIds=ST1,ST2&limit=5`,
        options
      );
      const data = await response.json();

      return data.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchRelatedSkills(skill_id_lightcast: string) {
    const accessToken = await fetchToken();
    const relatedOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      //******************have to pass the ids inside body to fetch related skills***********************
      body: `{"ids":["${skill_id_lightcast}"]}`,
      json: true,
    };

    // console.log("relatedOptions = ", relatedOptions);

    try {
      const response = await fetch(
        `https://emsiservices.com/skills/versions/latest/related?limit=3`,
        relatedOptions
      );
      const data = await response.json();
      // console.log(data.data);

      return data.data;
    } catch (err) {
      console.log(err);
    }
  }

  interface IRoleSelectorProps {
    roles: Maybe<Array<Maybe<RoleTemplate>>>;
    value?: string;
    // eslint-disable-next-line no-unused-vars
    onSelect?: (val: Maybe<RoleTemplate>) => void;
  }

  const RoleSelectorSpecial = ({
    roles,
    value,
    onSelect,
  }: IRoleSelectorProps) => {
    const [query, setQuery] = useState(value || "");

    const filteredItems =
      query === ""
        ? roles
        : roles?.filter((role: Maybe<RoleTemplate>) =>
            role?.title
              ?.toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );

    const handleSelect = (val: any) => {
      if (val.title) {
        onSelect && onSelect(val);
        setQuery(val.title);
      } else {
        onSelect && onSelect({ title: val });
        setQuery(val);
      }
    };

    return (
      <Combobox as="div" value={query} onChange={handleSelect}>
        <div className="relative mb-4">
          <Combobox.Button className="w-full rounded-lg border sm:text-sm">
            <Combobox.Input
              style={{
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.15)",
              }}
              className="h-12 w-full rounded-md border-0 bg-white pl-4 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              displayValue={(query: string) => query}
              placeholder="Select your role"
            />
            <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </Combobox.Button>

          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredItems && [
              ...filteredItems?.map(
                (item: Maybe<RoleTemplate>, index: number) => (
                  <Combobox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${
                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    <span className={`block truncate font-medium`}>
                      {item?.title}
                    </span>
                  </Combobox.Option>
                )
              ),
              query.length > 0 &&
                !filteredItems.map((item) => item?.title).includes(query) && (
                  <Combobox.Option
                    key="new"
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${
                        active ? "bg-indigo-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={query}
                  >
                    <span className={`flex truncate font-medium`}>
                      {query}
                      <span
                        className={`block truncate pl-2 font-medium text-white`}
                      >
                        Search
                      </span>
                    </span>
                  </Combobox.Option>
                ),
            ]}
          </Combobox.Options>
        </div>
      </Combobox>
    );
  };

  interface RoleSmallCardProps {
    role: Maybe<RoleType>;
    isSelected: boolean;
    // eslint-disable-next-line no-unused-vars
    onClick: (val: Maybe<RoleType>) => void;
  }

  const RoleSmallCard = ({ role, isSelected, onClick }: RoleSmallCardProps) => {
    return (
      <div onClick={() => onClick(role)}>
        <Card
          border
          focused={isSelected}
          shadow
          className="overflow-hidden bg-white p-0"
        >
          <div className="flex cursor-pointer flex-col items-start justify-start px-3 py-2">
            <TextBody>
              {role?.title && role?.title?.length > 10
                ? role?.title?.slice(0, 20) + "..."
                : role?.title}
            </TextBody>
          </div>
        </Card>
      </div>
    );
  };

  const handelSelect = async (val: Maybe<RoleTemplate>) => {
    setLightSkillsLoading(true);
    if (val && val.title) {
      const tempLightSkills = await fetchSkills(val.title);

      setSkillsFromLight(tempLightSkills);
      // console.log(tempLightSkills);
    }
    setLightSkillsLoading(false);
  };

  const handelOnDone = async () => {
    setIsLoading(true);
    console.log("SelectedLightSkill", selectedSkillFromLight);
    console.log("RelatedSkillsFromLight", relatedSkillFromLight);
    console.log("SelectedSKills", selectedSkills);
    console.log("SelectedCat", selectedCategory);
    console.log("SelectedSubCat", selectedSubCategory);
    console.log("RelatedSkillFRomEden", relatedSkillFromEden);
    const skill = await refetchSkill({
      fields: { id_lightcast: selectedSkillFromLight?.id! },
    });

    // console.log("Skill", skill);

    const tempRelatedSkillCreate = [];
    const relatedSkillsToAdd: string[] = [];

    relatedSkillFromEden?.forEach((skill) => {
      relatedSkillsToAdd.push(skill.id);
    });
    let skillID;

    const checkRelatedSkills = async (relatedSkill: SkillFetched) => {
      const tempSkill = await refetchSkill({
        fields: { id_lightcast: relatedSkill?.id! },
      });

      if (tempSkill.data.findSkill === null) {
        return relatedSkill;
      } else {
        relatedSkillsToAdd.push(tempSkill.data.findSkill._id);
        return null;
      }
    };

    for (let i = 0; i < relatedSkillFromLight?.length!; i++) {
      tempRelatedSkillCreate.push(
        await checkRelatedSkills(relatedSkillFromLight![i])
      );
    }

    const relatedSkillCreate = _.uniq(tempRelatedSkillCreate).filter(
      (__) => __
    );

    for (let i = 0; i < relatedSkillCreate?.length!; i++) {
      await createSkill({
        variables: {
          fields: {
            name: relatedSkillCreate[i]?.name,
            id_lightcast: relatedSkillCreate[i]?.id,
            categorySkills: [selectedCategory?._id],
            subCategorySkill: [selectedSubCategory?._id],
          },
        },
        onCompleted: (data) => {
          relatedSkillsToAdd.push(data.createSkill._id);
        },
      });
    }

    if (skill.data.findSkill === null) {
      await createSkill({
        variables: {
          fields: {
            name: selectedSkillFromLight?.name,
            id_lightcast: selectedSkillFromLight?.id,
            categorySkills: [selectedCategory?._id],
            subCategorySkill: [selectedSubCategory?._id],
          },
        },
        onCompleted: (data) => {
          skillID = data.createSkill._id;
        },
      });
      debugger;
    } else {
      skillID = skill.data.findSkill._id;
    }
    await relatedSkill({
      variables: {
        fields: {
          relatedSkills_id: relatedSkillsToAdd,
          _id: skillID,
        },
      },
      onCompleted: (data) => {
        console.log("Finaalllll", data);
      },
      onError: (error) => console.log("Errrrroerrr", error),
    });
    setIsLoading(false);
  };

  useEffect(() => {
    const getCategories = async () => await refetch();

    getCategories();
  }, []);

  if (!currentUser) {
    return <h1>PLease LOgIn</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full scroll-m-0 flex-col items-center justify-start">
      <h1 className="bg-soilGreen-400 text-soilHeading2 mt-3 rounded-lg p-3">
        Add Skills
      </h1>
      <GridLayout>
        <GridItemSix>
          <>
            <h1 className="items-center justify-self-center">Light Api</h1>
            <RoleSelectorSpecial
              value={selectedSkillFromLight?.name}
              roles={skillsFromLight.map((skillFromLight) => {
                return {
                  title: skillFromLight.name,
                  _id: skillFromLight.id,
                };
              })}
              onSelect={handelSelect}
            />
            <GridLayout>
              {lightSkillsLoading ? (
                <Loading />
              ) : (
                skillsFromLight.map((skillFromLight) => {
                  return (
                    <GridItemFour key={skillFromLight.id}>
                      <RoleSmallCard
                        role={{
                          title: skillFromLight.name,
                          _id: skillFromLight.id,
                        }}
                        isSelected={
                          skillFromLight.id === selectedSkillFromLight?.id
                            ? true
                            : false
                        }
                        onClick={async (val: Maybe<RoleType>) => {
                          setRelatedSkillsLoading(true);
                          const relatedSkills = await fetchRelatedSkills(
                            val?._id!
                          );

                          const relatedFromEden = await refetchSkill({
                            fields: { id_lightcast: val?._id! },
                          });

                          setSelectedSkillFromLight({
                            name: val?.title!,
                            id: val?._id!,
                          });
                          if (relatedFromEden.data.findSkill !== null)
                            setRelatedSkillFromEden(
                              relatedFromEden.data.findSkill.relatedSkills
                            );
                          setRelatedSkillFromLight(relatedSkills);
                          setRelatedSkillsLoading(false);
                        }}
                      />
                    </GridItemFour>
                  );
                })
              )}
            </GridLayout>
          </>
        </GridItemSix>
        <GridItemSix>
          <>
            <h1 className="items-center justify-self-center">Eden Api</h1>
            <SearchSkill
              skills={selectedSkills}
              setSkills={setSelectedSkills}
              levels={[
                { title: "learning", level: "learning" },
                { title: "junior", level: "junior" },
                { title: "mid", level: "mid" },
                { title: "senior", level: "senior" },
              ]}
            />
            {relatedSkillsLoading ? (
              <Loading />
            ) : (
              <>
                <SkillList
                  colorRGB="214,254,235"
                  skills={relatedSkillFromLight?.map((skill) => {
                    return {
                      skillInfo: {
                        name: skill.name,
                        _id: skill.id,
                      },
                    };
                  })}
                  closeButton={true}
                  handleDeleteSkill={(skill: any) => {
                    const tempSkills = relatedSkillFromLight?.filter(
                      (selectedSkill: any) => {
                        return selectedSkill?.id !== skill.skillInfo._id;
                      }
                    );

                    setRelatedSkillFromLight(tempSkills);
                  }}
                />
                {selectedSkills.length > 0 && <h1>New Selected Skills</h1>}
                <SkillList
                  colorRGB="200,210,220"
                  skills={selectedSkills}
                  closeButton={true}
                  handleDeleteSkill={(skill: any) => {
                    const tempSkills = selectedSkills.filter(
                      (selectedSkill: any) => {
                        return (
                          selectedSkill?.skillInfo?._id !== skill.skillInfo._id
                        );
                      }
                    );

                    setSelectedSkills(tempSkills);
                  }}
                />
                {relatedSkillFromEden && relatedSkillFromEden.length > 0 && (
                  <h1>Related Skills From Eden</h1>
                )}
                <SkillList
                  colorRGB="214,254,235"
                  skills={relatedSkillFromEden?.map((skill) => {
                    return {
                      skillInfo: {
                        name: skill.name,
                        _id: skill.id,
                      },
                    };
                  })}
                  closeButton={true}
                  handleDeleteSkill={(skill: any) => {
                    const tempSkills = relatedSkillFromEden?.filter(
                      (selectedSkill: any) => {
                        return selectedSkill?.id !== skill.skillInfo._id;
                      }
                    );

                    setRelatedSkillFromEden(tempSkills);
                  }}
                />
              </>
            )}
          </>
        </GridItemSix>
      </GridLayout>
      <GridLayout>
        <GridItemSix>
          <>
            <h1 className="items-center justify-self-center">
              Select Category
            </h1>
            {categories && categories.length > 0 && !loading ? (
              <RoleSelector
                roles={categories!.map((cat) => {
                  return {
                    _id: cat?._id!,
                    title: cat?.name!,
                  };
                })}
                onSelect={(selectedCat) => {
                  setSelectedCategory(
                    categories.filter((cat) => cat?._id === selectedCat?._id)[0]
                  );
                }}
              />
            ) : (
              <Loading />
            )}
          </>
        </GridItemSix>
        <GridItemSix>
          <>
            <h1 className="items-center justify-self-center">
              Select SUb Category
            </h1>
            {selectedCategory && (
              <RoleSelector
                roles={selectedCategory.subCategorySkill!.map((subCat) => {
                  return {
                    _id: subCat?._id!,
                    title: subCat?.name!,
                  };
                })}
                onSelect={(selectedSubCat) =>
                  setSelectedSubCategory(
                    selectedCategory.subCategorySkill?.filter(
                      (subCat) => subCat?._id === selectedSubCat?._id
                    )[0]
                  )
                }
              />
            )}
          </>
        </GridItemSix>
      </GridLayout>
      {selectedSubCategory && (
        <Button onClick={handelOnDone} variant="primary">
          Done
        </Button>
      )}
    </div>
  );
};

AdminPanelToAddNewSkill.getLayout = (page) => (
  <AppAdminLayout>{page}</AppAdminLayout>
);

export default AdminPanelToAddNewSkill;
