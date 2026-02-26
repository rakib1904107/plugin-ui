import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { LicensePage, type LicenseStatus } from "./license-page";
import React, { useState } from "react";

const DefaultHeaderImage = () => (
  <svg
    width="122"
    height="83"
    viewBox="0 0 122 83"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      y="13.7734"
      width="112.215"
      height="68.6155"
      rx="4.58333"
      fill="oklch(0.93 0.03 285)"
    />
    <path
      d="M0 18.3568C0 15.8255 2.05203 13.7734 4.58333 13.7734H17.5738C20.1051 13.7734 22.1571 15.8255 22.1571 18.3568V77.8089C22.1571 80.3384 20.1065 82.3889 17.5771 82.3889H4.57999C2.05053 82.3889 0 80.3384 0 77.8089V18.3568Z"
      fill="oklch(0.85 0.06 285)"
    />
    <rect
      x="38.5977"
      y="36.6445"
      width="45.7437"
      height="4.28847"
      rx="2.14423"
      fill="white"
    />
    <rect
      x="38.5977"
      y="45.2188"
      width="45.7437"
      height="4.28847"
      rx="2.14423"
      fill="white"
    />
    <rect
      x="38.5977"
      y="53.7969"
      width="45.7437"
      height="4.28847"
      rx="2.14423"
      fill="white"
    />
    <rect
      x="38.5977"
      y="62.375"
      width="45.7437"
      height="4.28847"
      rx="2.14423"
      fill="white"
    />
    <path
      d="M98 53.6712C98 51.5638 99.7084 49.8555 101.816 49.8555H118.184C120.292 49.8555 122 51.5638 122 53.6712V68.4034C122 70.5107 120.292 72.2191 118.184 72.2191H101.816C99.7084 72.2191 98 70.5107 98 68.4034V53.6712Z"
      fill="oklch(0.54 0.21 285)"
    />
    <rect
      x="35.3672"
      width="24"
      height="22.8837"
      rx="3.90447"
      fill="oklch(0.54 0.21 285)"
    />
  </svg>
);

const meta = {
  title: "Components/LicensePage",
  component: LicensePage,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    onActivate: fn(),
    onDeactivate: fn(),
    onRefresh: fn(),
    onLicenseKeyChange: fn(),
  },
  argTypes: {
    licenseKey: { control: "text" },
    loading: { control: "boolean" },
    error: { control: "text" },
    pluginName: { control: "text" },
    hookNamespace: { control: "text" },
  },
} satisfies Meta<typeof LicensePage>;

export default meta;

type Story = StoryObj<typeof meta>;

// --- Inactive state (no license) ---

export const Inactive: Story = {
  args: {
    licenseKey: "",
    status: null,
    loading: false,
    error: "",
    pluginName: "MyPlugin Pro",
    headerImage: <DefaultHeaderImage />,
  },
};

export const InactiveWithKey: Story = {
  args: {
    licenseKey: "abc123-def456-ghi789-jkl012",
    status: null,
    loading: false,
    error: "",
    pluginName: "MyPlugin Pro",
    headerImage: <DefaultHeaderImage />,
  },
};

// --- Active state ---

const activeStatus: LicenseStatus = {
  is_valid: true,
  expiry_days: 120,
  data: {
    key: "abc123-def456-ghi789-jkl012-mno345",
    remaining: 3,
    activation_limit: 5,
  },
};

export const Active: Story = {
  args: {
    licenseKey: "abc123-def456-ghi789-jkl012-mno345",
    status: activeStatus,
    loading: false,
    error: "",
    pluginName: "MyPlugin Pro",
    headerImage: <DefaultHeaderImage />,
  },
};

// --- Active with perpetual license ---

const perpetualStatus: LicenseStatus = {
  is_valid: true,
  expiry_days: 0,
  data: {
    key: "abc123-def456-ghi789-jkl012-mno345",
    remaining: 10,
    activation_limit: 25,
  },
};

export const ActivePerpetual: Story = {
  args: {
    licenseKey: "abc123-def456-ghi789-jkl012-mno345",
    status: perpetualStatus,
    loading: false,
    error: "",
    pluginName: "MyPlugin Pro",
    headerImage: <DefaultHeaderImage />,
  },
};

// --- Loading state ---

export const Loading: Story = {
  args: {
    licenseKey: "",
    status: null,
    loading: true,
    error: "",
    pluginName: "MyPlugin Pro",
    headerImage: <DefaultHeaderImage />,
  },
};

// --- Error state ---

export const WithError: Story = {
  args: {
    licenseKey: "invalid-key",
    status: null,
    loading: false,
    error: "The license key you entered is invalid. Please check and try again.",
    pluginName: "MyPlugin Pro",
    headerImage: <DefaultHeaderImage />,
  },
};

// --- Without header image ---

export const WithoutHeaderImage: Story = {
  args: {
    licenseKey: "",
    status: null,
    loading: false,
    error: "",
    pluginName: "wePos",
  },
};

// --- Custom labels ---

export const CustomLabels: Story = {
  args: {
    licenseKey: "",
    status: null,
    loading: false,
    error: "",
    pluginName: "Starter Plugin",
    headerImage: <DefaultHeaderImage />,
    labels: {
      title: "Activation",
      activationTitle: "Product Activation",
      activateButton: "Activate Now",
      licenseKeyPlaceholder: "Paste your license key...",
    },
  },
};

// --- Interactive playground ---

const InteractiveTemplate = () => {
  const [licenseKey, setLicenseKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<LicenseStatus | null>(null);

  const handleActivate = async () => {
    setLoading(true);
    setError("");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (licenseKey === "invalid") {
      setError("Invalid license key. Please try again.");
      setLoading(false);
      return;
    }

    setStatus({
      is_valid: true,
      expiry_days: 365,
      data: {
        key: licenseKey,
        remaining: 4,
        activation_limit: 5,
      },
    });
    setLoading(false);
  };

  const handleDeactivate = async () => {
    setLoading(true);
    setError("");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus(null);
    setLicenseKey("");
    setLoading(false);
  };

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
  };

  return (
    <LicensePage
      licenseKey={licenseKey}
      onLicenseKeyChange={setLicenseKey}
      status={status}
      loading={loading}
      error={error}
      onActivate={handleActivate}
      onDeactivate={handleDeactivate}
      onRefresh={handleRefresh}
      pluginName="Demo Plugin"
      hookNamespace="demo_plugin"
      headerImage={<DefaultHeaderImage />}
    />
  );
};

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
  args: {
    licenseKey: "",
    status: null,
    loading: false,
    error: "",
  },
  parameters: {
    docs: {
      description: {
        story:
          "A fully interactive demo with simulated API calls. Type any key to activate (type 'invalid' to see error state).",
      },
    },
  },
};
