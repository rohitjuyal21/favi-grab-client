import React, { useState } from "react";
import axios from "axios";
import WordPullUp from "./magicui/word-pull-up";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Download } from "lucide-react";
import toast from "react-hot-toast";

interface Favicon {
  icon: string;
  source: string;
}

const formSchema = z.object({
  url: z.string().url({
    message: "Please enter a valid URL",
  }),
  size: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

const sizes = ["16", "32", "64", "128", "256"];

const Main: React.FC = () => {
  const [favicons, setFavicons] = useState<Favicon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState("16");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      size: "16",
    },
  });

  const onSubmit = async (data: FormSchema) => {
    setSelectedSize(data.size);
    setLoading(true);
    setError(null);
    setFavicons([]);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/favicons?url=${encodeURIComponent(
          data.url
        )}&size=${data.size}`
      );
      setFavicons(response.data);
    } catch (error) {
      console.error("Error fetching favicons:", error);
      setError("Failed to fetch favicons. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadIcon = (iconUrl: string) => {
    const link = document.createElement("a");
    link.href = iconUrl;
    const url = new URL(form.getValues().url);
    const domain = url.hostname
      .replace(/^www\./, "")
      .split(".")
      .slice(-2, -1)[0];
    link.download = `${domain}`;
    document.body.appendChild(link);
    link.click();
    toast.success("Downloaded");
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <WordPullUp
        className="text-3xl md:text-4xl font-semibold tracking-[-0.02em]"
        words="Download favicons in your preferred size"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 items-center justify-center my-8 w-full"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Paste a valid URL"
                    className="w-full px-4 mx-auto"
                  />
                </FormControl>
                {form.formState.errors.url && (
                  <FormMessage>
                    {form.formState.errors.url?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <div className="w-full flex gap-4">
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Select
                      defaultValue={selectedSize}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {sizes.map((size) => (
                            <SelectItem
                              key={size}
                              value={size}
                              className="font-poppins"
                            >
                              {size} x {size}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex justify-start">
            <Button type="submit" disabled={loading}>
              {loading ? "Grabbing..." : "Grab Icon"}
            </Button>
          </div>
        </form>
      </Form>
      {error && <p className="text-destructive mb-4">{error}</p>}
      <div className="flex items-start flex-wrap gap-4 w-full">
        {favicons.map((favicon, index) => (
          <div
            key={index}
            className="border bg-muted/30 p-3 rounded flex flex-col items-center"
          >
            <img
              src={favicon.icon}
              alt={`Favicon from ${favicon.source}`}
              className="mx-auto mb-3"
              style={{
                width: `${selectedSize}px`,
                height: `${selectedSize}px`,
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8"
              onClick={() => downloadIcon(favicon.icon)}
            >
              <Download className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
